/*
  Warnings:

  - Added the required column `titulo` to the `Vaga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vaga" ADD COLUMN     "titulo" TEXT NOT NULL;
