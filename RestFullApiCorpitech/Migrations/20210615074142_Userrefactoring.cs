using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestFullApiCorpitech.Migrations
{
    public partial class Userrefactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_Users_userId",
                table: "Vacations");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("263542b1-67fb-4f7e-a101-ed6269b55be4"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2916855f-92c1-48e8-b503-9c9b9a82c767"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5aa51e86-85e0-4de4-911f-d152759df7be"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("aa91cd24-0c04-41a9-8381-6a61cb25d9c9"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("afbf3ddd-385c-46ae-8c63-8a30b59facec"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b99f0b92-d465-4f88-86b8-05c3f79b061b"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("bde8aee1-7453-4faf-bad8-e126cef7b708"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d459ba5a-769e-4f9b-89f5-afa101e11cb8"));

            migrationBuilder.DropColumn(
                name: "days",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "value",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Vacations",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "startVacation",
                table: "Vacations",
                newName: "StartVacation");

            migrationBuilder.RenameColumn(
                name: "endVacation",
                table: "Vacations",
                newName: "EndVacation");

            migrationBuilder.RenameIndex(
                name: "IX_Vacations_userId",
                table: "Vacations",
                newName: "IX_Vacations_UserId");

            migrationBuilder.RenameColumn(
                name: "dateOfEmployment",
                table: "Users",
                newName: "DateOfEmployment");

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Vacations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_Users_UserId",
                table: "Vacations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_Users_UserId",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Vacations",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "StartVacation",
                table: "Vacations",
                newName: "startVacation");

            migrationBuilder.RenameColumn(
                name: "EndVacation",
                table: "Vacations",
                newName: "endVacation");

            migrationBuilder.RenameIndex(
                name: "IX_Vacations_UserId",
                table: "Vacations",
                newName: "IX_Vacations_userId");

            migrationBuilder.RenameColumn(
                name: "DateOfEmployment",
                table: "Users",
                newName: "dateOfEmployment");

            migrationBuilder.AddColumn<double>(
                name: "days",
                table: "Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "value",
                table: "Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Middlename", "Name", "Surname", "dateOfEmployment", "days", "value" },
                values: new object[,]
                {
                    { new Guid("2916855f-92c1-48e8-b503-9c9b9a82c767"), "Иванович", "Иван", "Иванов", new DateTime(2015, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("bde8aee1-7453-4faf-bad8-e126cef7b708"), "Василиевич", "Дмитрий", "Пупкин", new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("5aa51e86-85e0-4de4-911f-d152759df7be"), "Яновичк", "Максим", "Козий", new DateTime(2017, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("263542b1-67fb-4f7e-a101-ed6269b55be4"), "Безотчествович", "Ян", "Гордынский", new DateTime(2016, 12, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("afbf3ddd-385c-46ae-8c63-8a30b59facec"), "Сергеевич", "Антон", "Новиков", new DateTime(2021, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("d459ba5a-769e-4f9b-89f5-afa101e11cb8"), "Васильевич", "Василий", "Васин", new DateTime(2018, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("aa91cd24-0c04-41a9-8381-6a61cb25d9c9"), "Данилович", "Иван", "Обжигайлов", new DateTime(2017, 7, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 },
                    { new Guid("b99f0b92-d465-4f88-86b8-05c3f79b061b"), "Андреевна", "Альбина", "Кузина", new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 0.0 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_Users_userId",
                table: "Vacations",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
