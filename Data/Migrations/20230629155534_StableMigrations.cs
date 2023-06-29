using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace scheduler.Data.Migrations
{
    public partial class StableMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("318c212e-c1cf-444a-7ca3-08db602a105a"),
                column: "PasswordHash",
                value: "$2a$10$JEcaPhrFMbvgFgeWCppT1.x3eF72wAmg8VPIqH3w28m9pjKY1aFOm");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"),
                column: "PasswordHash",
                value: "$2a$10$SFj9fotNhmDP48wztIk8DOnzCUxDFKDvG7XCqKNXLpfu22JG1Op6y");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("edb42291-18b6-4713-c84b-08db59c30ba6"),
                column: "PasswordHash",
                value: "$2a$10$8AdOnBG5wGiCdyQbzRnQ5e3ULlillR2i6Z1bq.fuF8adASx9da.5S");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "appointments",
                columns: new[] { "Id", "id_calendar", "canceled_at", "edit_able", "end", "location", "name", "start", "status", "id_user", "UserId1" },
                values: new object[,]
                {
                    { 1, 1, null, false, new DateTime(2023, 6, 25, 11, 0, 0, 0, DateTimeKind.Local), "Hi Coffee", "Meeting with John", new DateTime(2023, 6, 25, 10, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 14, 7, null, true, new DateTime(2023, 6, 29, 7, 56, 55, 41, DateTimeKind.Local), "KTX Khu A", "Vacation", new DateTime(2023, 6, 28, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 13, 5, null, true, new DateTime(2023, 7, 6, 7, 56, 55, 41, DateTimeKind.Local), null, "Training Session", new DateTime(2023, 7, 5, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 12, 5, null, false, new DateTime(2023, 7, 2, 17, 0, 0, 0, DateTimeKind.Local), "Dont know", "Conference Call", new DateTime(2023, 7, 1, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 11, 3, null, true, new DateTime(2023, 6, 21, 14, 56, 55, 41, DateTimeKind.Local), null, "Team Lunch", new DateTime(2023, 6, 21, 13, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 10, 3, null, true, new DateTime(2023, 6, 21, 11, 56, 55, 41, DateTimeKind.Local), null, "Client Meeting", new DateTime(2023, 6, 21, 10, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 8, 2, null, true, new DateTime(2023, 6, 29, 19, 56, 55, 41, DateTimeKind.Local), null, "FE Workshop", new DateTime(2023, 6, 29, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 9, 2, null, true, new DateTime(2023, 6, 21, 8, 56, 55, 41, DateTimeKind.Local), null, "Report", new DateTime(2023, 6, 21, 7, 56, 55, 41, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 6, 3, null, true, new DateTime(2023, 6, 27, 15, 0, 0, 0, DateTimeKind.Local), null, "Doctor's appointment", new DateTime(2023, 6, 27, 14, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 5, 2, null, true, new DateTime(2023, 6, 28, 15, 0, 0, 0, DateTimeKind.Local), null, "Conference call", new DateTime(2023, 6, 28, 14, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 4, 4, null, true, new DateTime(2023, 6, 27, 13, 0, 0, 0, DateTimeKind.Local), null, "Lunch with Alice", new DateTime(2023, 6, 27, 12, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 3, 3, null, true, new DateTime(2023, 6, 25, 11, 0, 0, 0, DateTimeKind.Local), null, "Meeting with John", new DateTime(2023, 6, 25, 10, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 2, 4, null, true, new DateTime(2023, 6, 26, 13, 0, 0, 0, DateTimeKind.Local), "Luna restaurant", "Lunch with Alice", new DateTime(2023, 6, 26, 12, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null },
                    { 7, 4, null, true, new DateTime(2023, 6, 29, 14, 0, 0, 0, DateTimeKind.Local), null, "Project meeting", new DateTime(2023, 6, 29, 13, 0, 0, 0, DateTimeKind.Local), true, new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"), null }
                });

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("318c212e-c1cf-444a-7ca3-08db602a105a"),
                column: "PasswordHash",
                value: "$2a$10$klfOiAYvs9WYZTHud22zfe6nJrHH8ZwcXqPD6UytSwuxnmN201/y6");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("39f84ed2-41d7-4f50-c84a-08db59c30ba6"),
                column: "PasswordHash",
                value: "$2a$10$nS0qIau3bBBNNPChHLXe.u8g0UG.IrJugUeV1fKQk/LYwmeYGnKny");

            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "Id",
                keyValue: new Guid("edb42291-18b6-4713-c84b-08db59c30ba6"),
                column: "PasswordHash",
                value: "$2a$10$B73SiD26Hy1n50CaooS99u3v8Si4owVGaGADo0NpzbD9TlfFJdNii");
        }
    }
}
