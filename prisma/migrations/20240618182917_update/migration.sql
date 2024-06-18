/*
  Warnings:

  - Changed the type of `type` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('break', 'work');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "type",
ADD COLUMN     "type" "TaskType" NOT NULL;

-- DropEnum
DROP TYPE "Type";
