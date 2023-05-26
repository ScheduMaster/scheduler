using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace scheduler.Data.Migrations
{
    public partial class Intivation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "invitations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    appointment_id = table.Column<int>(type: "int", nullable: false),
                    expires_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invitations", x => x.id);
                    table.ForeignKey(
                        name: "FK_invitations_appointments_appointment_id",
                        column: x => x.appointment_id,
                        principalTable: "appointments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_invitations_appointment_id",
                table: "invitations",
                column: "appointment_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "invitations");
        }
    }
}
