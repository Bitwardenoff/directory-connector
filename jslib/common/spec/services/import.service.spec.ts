import Substitute, { SubstituteOf } from "@fluffy-spoon/substitute";

import { ApiService } from "@/jslib/common/src/abstractions/api.service";
import { CipherService } from "@/jslib/common/src/abstractions/cipher.service";
import { CollectionService } from "@/jslib/common/src/abstractions/collection.service";
import { CryptoService } from "@/jslib/common/src/abstractions/crypto.service";
import { FolderService } from "@/jslib/common/src/abstractions/folder.service";
import { I18nService } from "@/jslib/common/src/abstractions/i18n.service";
import { PlatformUtilsService } from "@/jslib/common/src/abstractions/platformUtils.service";
import { BitwardenPasswordProtectedImporter } from "@/jslib/common/src/importers/bitwardenPasswordProtectedImporter";
import { Importer } from "@/jslib/common/src/importers/importer";
import { Utils } from "@/jslib/common/src/misc/utils";
import { ImportService } from "@/jslib/common/src/services/import.service";

describe("ImportService", () => {
  let importService: ImportService;
  let cipherService: SubstituteOf<CipherService>;
  let folderService: SubstituteOf<FolderService>;
  let apiService: SubstituteOf<ApiService>;
  let i18nService: SubstituteOf<I18nService>;
  let collectionService: SubstituteOf<CollectionService>;
  let platformUtilsService: SubstituteOf<PlatformUtilsService>;
  let cryptoService: SubstituteOf<CryptoService>;

  beforeEach(() => {
    cipherService = Substitute.for<CipherService>();
    folderService = Substitute.for<FolderService>();
    apiService = Substitute.for<ApiService>();
    i18nService = Substitute.for<I18nService>();
    collectionService = Substitute.for<CollectionService>();
    platformUtilsService = Substitute.for<PlatformUtilsService>();
    cryptoService = Substitute.for<CryptoService>();

    importService = new ImportService(
      cipherService,
      folderService,
      apiService,
      i18nService,
      collectionService,
      platformUtilsService,
      cryptoService
    );
  });

  describe("getImporterInstance", () => {
    describe("Get bitPasswordProtected importer", () => {
      let importer: Importer;
      const organizationId = Utils.newGuid();
      const password = Utils.newGuid();

      beforeEach(() => {
        importer = importService.getImporter(
          "bitwardenpasswordprotected",
          organizationId,
          password
        );
      });

      it("returns an instance of BitwardenPasswordProtectedImporter", () => {
        expect(importer).toBeInstanceOf(BitwardenPasswordProtectedImporter);
      });

      it("has the appropriate organization Id", () => {
        expect(importer.organizationId).toEqual(organizationId);
      });

      it("has the appropriate password", () => {
        expect(Object.entries(importer)).toEqual(expect.arrayContaining([["password", password]]));
      });
    });
  });
});
