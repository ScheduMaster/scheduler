using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Log the request details
        var requestDetails = $"[{DateTime.UtcNow}] {context.Request.Method} {context.Request.Path}";
        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine(requestDetails);
        Console.ResetColor();

        // Call the next middleware in the pipeline
        await _next(context);

        // Log the response details
        var responseDetails = $"[{DateTime.UtcNow}] {context.Response.StatusCode}";
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine(responseDetails);
        Console.ResetColor();
    }
}