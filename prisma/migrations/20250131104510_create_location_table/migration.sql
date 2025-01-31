-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "municipality" TEXT NOT NULL,
    "bfsNumber" TEXT NOT NULL,
    "canton" TEXT NOT NULL,
    "coordinateE" DOUBLE PRECISION NOT NULL,
    "coordinateN" DOUBLE PRECISION NOT NULL,
    "language" TEXT NOT NULL,
    "validity" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
