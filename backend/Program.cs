using RandomJoke.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000") 
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient<JokeService>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.UseRouting();
app.MapControllers();

app.Run();
