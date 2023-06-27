FROM mcr.microsoft.com/dotnet/sdk:5.0 as build-env

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app/src

# Copy the rest of the backend source code
COPY . .

# Install all .NET dependencies
RUN dotnet restore

# Run publish project
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/sdk:5.0 as runtime

# Prepare Dotnet Entity Framework
RUN dotnet tool install --global dotnet-ef --version 5.0.17
ENV PATH="${PATH}:/root/.dotnet/tools"

WORKDIR /app/publish
COPY --from=build-env /app/publish .

ENTRYPOINT ["dotnet", "scheduler.dll"]

# Expose all ports
EXPOSE 5000