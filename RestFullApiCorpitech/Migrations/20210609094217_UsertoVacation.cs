using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestFullApiCorpitech.Migrations
{
    public partial class UsertoVacation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<DateTime>(
                name: "dateOfEndVacation",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "dateOfStartVacation",
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
                name: "Vacation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    startVacation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endVacation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vacation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vacation_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("716c2e99-6f6c-4472-81a5-43c56e11637c"),
                columns: new[] { "dateOfEmployment", "dateOfEndVacation", "dateOfStartVacation" },
                values: new object[] { new DateTime(2015, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2016, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2016, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.CreateIndex(
                name: "IX_Vacation_UserId",
                table: "Vacation",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vacation");

            migrationBuilder.DropColumn(
                name: "dateOfEmployment",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "dateOfEndVacation",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "dateOfStartVacation",
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
        }
    }
}
