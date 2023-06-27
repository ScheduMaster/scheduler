using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace scheduler.Data.Migrations
{
    public partial class FinalSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "DateOfBirth", "Email", "EmailConfirmed", "FirstName", "IsActive", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), 0, "Ho Chi Minh", "bdb211de-f18a-45e2-a4b0-7635cc97366a", new DateTime(2001, 12, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "hoc@scheduler.com", false, "Hoc", false, "Tran Van", false, null, null, null, null, "$2a$10$nS0qIau3bBBNNPChHLXe.u8g0UG.IrJugUeV1fKQk/LYwmeYGnKny", "01269454343", false, "Admin", null, false, null });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "DateOfBirth", "Email", "EmailConfirmed", "FirstName", "IsActive", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("edb42291-18b6-4713-c84b-08db59c30ba6"), 0, "123 Main St, Anytown, USA", "a1a73651-898f-4227-9ec7-509bb1e136da", new DateTime(1996, 12, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "cuong@scheduler.com", false, "Cuong", false, "Luu", false, null, null, null, null, "$2a$10$B73SiD26Hy1n50CaooS99u3v8Si4owVGaGADo0NpzbD9TlfFJdNii", "0979182391", false, "Client", null, false, null });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "DateOfBirth", "Email", "EmailConfirmed", "FirstName", "IsActive", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("318c212e-c1cf-444a-7ca3-08db602a105a"), 0, "257 Fireweed Ln", "4993d8f0-d015-45da-b263-663a9f0fe5f5", new DateTime(1954, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@scheduler.com", false, "Admin", false, "Demo", false, null, null, null, null, "$2a$10$klfOiAYvs9WYZTHud22zfe6nJrHH8ZwcXqPD6UytSwuxnmN201/y6", "01269454344", false, "Admin", null, false, null });

            migrationBuilder.InsertData(
                table: "calendars",
                columns: new[] { "id", "background_color", "border_color", "drag_background_color", "name", "user_id" },
                values: new object[,]
                {
                    { 1, "#ffffff", "#000000", "#cccccc", "Default", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 2, "#9e5fff", "#65a94c", "#839334", "Private", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 3, "#00a9ff", "#00a9ff", "#00a9ff", "Company", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 4, "#66cc66", "#66cc66", "#66cc66", "Vacation", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 5, "#ffa500", "#ffa500", "#ffa500", "Meetings", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 6, "#f5f5dc", "#f5f5dc", "#f5f5dc", "Holidays", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 7, "#ff69b4", "#ff69b4", "#ff69b4", "Birthdays", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 8, "#8b0000", "#8b0000", "#8b0000", "Deadlines", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 9, "#00ced1", "#00ced1", "#00ced1", "Appointments", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 10, "#ffd700", "#ffd700", "#ffd700", "Tasks", new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6") },
                    { 11, "#c05d5d", "#ed0c0c", "#2c1111", "Van Lang", new Guid("edb42291-18b6-4713-c84b-08db59c30ba6") }
                });

            migrationBuilder.InsertData(
                table: "appointments",
                columns: new[] { "Id", "id_calendar", "canceled_at", "edit_able", "end", "location", "name", "start", "status", "id_user", "UserId1" },
                values: new object[,]
                {
                    { 1, 1, null, false, new DateTime(2023, 6, 25, 11, 0, 0, 0, DateTimeKind.Local), "Hi Coffee", "Meeting with John", new DateTime(2023, 6, 25, 10, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 5, 2, null, true, new DateTime(2023, 6, 28, 15, 0, 0, 0, DateTimeKind.Local), null, "Conference call", new DateTime(2023, 6, 28, 14, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 8, 2, null, true, new DateTime(2023, 6, 29, 19, 56, 55, 41, DateTimeKind.Local), null, "FE Workshop", new DateTime(2023, 6, 29, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 9, 2, null, true, new DateTime(2023, 6, 21, 8, 56, 55, 41, DateTimeKind.Local), null, "Report", new DateTime(2023, 6, 21, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 3, 3, null, true, new DateTime(2023, 6, 25, 11, 0, 0, 0, DateTimeKind.Local), null, "Meeting with John", new DateTime(2023, 6, 25, 10, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 6, 3, null, true, new DateTime(2023, 6, 27, 15, 0, 0, 0, DateTimeKind.Local), null, "Doctor's appointment", new DateTime(2023, 6, 27, 14, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 10, 3, null, true, new DateTime(2023, 6, 21, 11, 56, 55, 41, DateTimeKind.Local), null, "Client Meeting", new DateTime(2023, 6, 21, 10, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 11, 3, null, true, new DateTime(2023, 6, 21, 14, 56, 55, 41, DateTimeKind.Local), null, "Team Lunch", new DateTime(2023, 6, 21, 13, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 2, 4, null, true, new DateTime(2023, 6, 26, 13, 0, 0, 0, DateTimeKind.Local), "Luna restaurant", "Lunch with Alice", new DateTime(2023, 6, 26, 12, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 4, 4, null, true, new DateTime(2023, 6, 27, 13, 0, 0, 0, DateTimeKind.Local), null, "Lunch with Alice", new DateTime(2023, 6, 27, 12, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 7, 4, null, true, new DateTime(2023, 6, 29, 14, 0, 0, 0, DateTimeKind.Local), null, "Project meeting", new DateTime(2023, 6, 29, 13, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 12, 5, null, false, new DateTime(2023, 7, 2, 17, 0, 0, 0, DateTimeKind.Local), "Dont know", "Conference Call", new DateTime(2023, 7, 1, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 13, 5, null, true, new DateTime(2023, 7, 6, 7, 56, 55, 41, DateTimeKind.Local), null, "Training Session", new DateTime(2023, 7, 5, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 14, 7, null, true, new DateTime(2023, 6, 29, 7, 56, 55, 41, DateTimeKind.Local), "KTX Khu A", "Vacation", new DateTime(2023, 6, 28, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "appointments",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("318c212e-c1cf-444a-7ca3-08db602a105a"));

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "calendars",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("edb42291-18b6-4713-c84b-08db59c30ba6"));

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"));
        }
    }
}
