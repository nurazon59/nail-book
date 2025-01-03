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
    CONSTRAINT "BaseCoat_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TopCoat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "TopCoat_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "ArtNail_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ColorNail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "ColorNail_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NailSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BaseCoatToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BaseCoatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BaseCoat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BaseCoatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TopCoatToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TopCoatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TopCoat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TopCoatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArtNailToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArtNailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtNail" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtNailToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ColorNailToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ColorNailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ColorNail" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColorNailToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BaseCoatToUser_AB_unique" ON "_BaseCoatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BaseCoatToUser_B_index" ON "_BaseCoatToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TopCoatToUser_AB_unique" ON "_TopCoatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TopCoatToUser_B_index" ON "_TopCoatToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtNailToUser_AB_unique" ON "_ArtNailToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtNailToUser_B_index" ON "_ArtNailToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorNailToUser_AB_unique" ON "_ColorNailToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorNailToUser_B_index" ON "_ColorNailToUser"("B");
