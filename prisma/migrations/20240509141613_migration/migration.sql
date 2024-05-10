-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPERADMIN', 'ADMIN', 'MODERATOR', 'CITIZEN') NOT NULL DEFAULT 'CITIZEN',
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `tokenActivation` VARCHAR(191) NULL,
    `codeForgotPassword` VARCHAR(191) NULL,
    `expirationCodeForgotPassword` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_password_key`(`password`),
    UNIQUE INDEX `User_tokenActivation_key`(`tokenActivation`),
    UNIQUE INDEX `User_codeForgotPassword_key`(`codeForgotPassword`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ressource` (
    `id_ressource` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `visibility` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC',
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `relations` JSON NOT NULL,
    `isValid` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `isDraft` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id_ressource`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id_file` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_file`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id_chat` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_chat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id_favorite` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_favorite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id_like` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_like`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `id_participant` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `ressource_id` INTEGER NULL,

    PRIMARY KEY (`id_participant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ressource` ADD CONSTRAINT `Ressource_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_ressource_id_fkey` FOREIGN KEY (`ressource_id`) REFERENCES `Ressource`(`id_ressource`) ON DELETE SET NULL ON UPDATE CASCADE;
