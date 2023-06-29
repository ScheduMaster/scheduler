using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace scheduler.Data.Migrations
{
    public partial class stable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "connections");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "exchanges");

            migrationBuilder.DropTable(
                name: "messages");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "connections",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    connection_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    first_user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    second_user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_connections", x => x.id);
                    table.ForeignKey(
                        name: "FK_connection_first_user",
                        column: x => x.first_user_id,
                        principalTable: "users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_connection_second_user",
                        column: x => x.second_user_id,
                        principalTable: "users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customer_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "exchanges",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_appointment_requested = table.Column<int>(type: "int", nullable: false),
                    id_appointment_requestor = table.Column<int>(type: "int", nullable: false),
                    exchange_status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_exchanges", x => x.id);
                    table.ForeignKey(
                        name: "FK_exchange_appointment_requested",
                        column: x => x.id_appointment_requested,
                        principalTable: "appointments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_exchange_appointment_requestor",
                        column: x => x.id_appointment_requestor,
                        principalTable: "appointments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_exchanges_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_exchanges_users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_appointment = table.Column<int>(type: "int", nullable: false),
                    id_author = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_messages_appointments_id_appointment",
                        column: x => x.id_appointment,
                        principalTable: "appointments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_messages_users_id_author",
                        column: x => x.id_author,
                        principalTable: "users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_messages_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_connections_first_user_id",
                table: "connections",
                column: "first_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_connections_second_user_id",
                table: "connections",
                column: "second_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_userId",
                table: "Customer",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_exchanges_id_appointment_requested",
                table: "exchanges",
                column: "id_appointment_requested");

            migrationBuilder.CreateIndex(
                name: "IX_exchanges_id_appointment_requestor",
                table: "exchanges",
                column: "id_appointment_requestor");

            migrationBuilder.CreateIndex(
                name: "IX_exchanges_UserId",
                table: "exchanges",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_exchanges_UserId1",
                table: "exchanges",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_messages_id_appointment",
                table: "messages",
                column: "id_appointment");

            migrationBuilder.CreateIndex(
                name: "IX_messages_id_author",
                table: "messages",
                column: "id_author");

            migrationBuilder.CreateIndex(
                name: "IX_messages_UserId",
                table: "messages",
                column: "UserId");
        }
    }
}
