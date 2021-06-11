using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestFullApiCorpitech.Migrations
{
    public partial class asd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("716c2e99-6f6c-4472-81a5-43c56e11637c"));

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "Users",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "middlename",
                table: "Users",
                newName: "Middlename");

            migrationBuilder.AddColumn<DateTime>(
                name: "dateOfEmployment",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

            migrationBuilder.CreateTable(
                name: "Vacations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    startVacation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endVacation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vacations_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Vacations_userId",
                table: "Vacations",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vacations");

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
                name: "dateOfEmployment",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "days",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "value",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Users",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Middlename",
                table: "Users",
                newName: "middlename");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "middlename", "name", "surname" },
                values: new object[] { new Guid("716c2e99-6f6c-4472-81a5-43c56e11637c"), "Иванович", "Иван", "Иванов" });
        }
    }
}
