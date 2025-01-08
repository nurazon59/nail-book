-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BaseCoat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "BaseCoat_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BaseCoat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TopCoat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TopCoat_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TopCoat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ArtNail_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtNail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ColorNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ColorNail_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ColorNail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Nail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finger" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "NailSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NailSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
