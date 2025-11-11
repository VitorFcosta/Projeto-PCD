/*
  Warnings:

  - Added the required column `senha` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Candidato` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `senha` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Candidato" ADD COLUMN     "senha" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "senha" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
