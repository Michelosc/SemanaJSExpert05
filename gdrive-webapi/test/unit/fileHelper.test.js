import { describe, test, expect, jest } from "@jest/globals";
import Routes from "./../../src/routes.js";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 2055,
        mode: 33188,
        nlink: 1,
        uid: 1000,
        gid: 1001,
        rdev: 0,
        blksize: 4096,
        ino: 22983551,
        size: 685321,
        blocks: 1344,
        atimeMs: 1630980498482.289,
        mtimeMs: 1630550151634.866,
        ctimeMs: 1630980498488.956,
        birthtimeMs: 1630980498482.2898,
        atime: "2021-09-07T02:08:18.482Z",
        mtime: "2021-09-02T02:35:51.635Z",
        ctime: "2021-09-07T02:08:18.489Z",
        birthtime: "2021-09-07T02:08:18.482Z",
      };

      const mockUser = "michel";
      process.env.USER = mockUser;
      const filename = "file.jpg";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFileStatus(
        "/home/michel/Documents/semana-javascript-expert05/gdrive-webapi/downloads"
      );

      const expectedResult = [
        {
          size: "685 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(
        `/home/michel/Documents/semana-javascript-expert05/gdrive-webapi/downloads/${filename}`
      );
      expect(result).toMatchObject(expectedResult);
    });
  });
});
