/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `art` on the `Nail` table. All the data in the column will be lost.
  - You are about to drop the column `base` on the `Nail` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Nail` table. All the data in the column will be lost.
  - You are about to drop the column `top` on the `Nail` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - Added the required column `artId` to the `Nail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseId` to the `Nail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `Nail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topId` to the `Nail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NailSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationToken_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Account";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationToken";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BaseCoat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TopCoat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ArtNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ColorNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finger" TEXT NOT NULL,
    "baseId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,
    "artId" TEXT NOT NULL,
    "topId" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    CONSTRAINT "Nail_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "BaseCoat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nail_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ColorNail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nail_artId_fkey" FOREIGN KEY ("artId") REFERENCES "ArtNail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nail_topId_fkey" FOREIGN KEY ("topId") REFERENCES "TopCoat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Nail_setId_fkey" FOREIGN KEY ("setId") REFERENCES "NailSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Nail" ("finger", "id", "setId") SELECT "finger", "id", "setId" FROM "Nail";
DROP TABLE "Nail";
ALTER TABLE "new_Nail" RENAME TO "Nail";
CREATE TABLE "new_NailSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NailSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NailSet" ("base", "id", "image", "title", "userId") SELECT "base", "id", "image", "title", "userId" FROM "NailSet";
DROP TABLE "NailSet";
ALTER TABLE "new_NailSet" RENAME TO "NailSet";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("admin", "createdAt", "email", "id", "image", "name") SELECT "admin", "createdAt", "email", "id", "image", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
