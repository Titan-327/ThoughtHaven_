/*
  Warnings:

  - Added the required column `imageLink` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageLink" TEXT NOT NULL;
