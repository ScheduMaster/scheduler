using Microsoft.EntityFrameworkCore.Migrations;

namespace scheduler.Data.Migrations
{
    public partial class Team : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "appointments",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_invitations_partner_id",
                table: "invitations",
                column: "partner_id");

            migrationBuilder.AddForeignKey(
                name: "FK_invitations_users_partner_id",
                table: "invitations",
                column: "partner_id",
                principalTable: "users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_invitations_users_partner_id",
                table: "invitations");

            migrationBuilder.DropIndex(
                name: "IX_invitations_partner_id",
                table: "invitations");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "appointments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
