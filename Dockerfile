FROM mcr.microsoft.com/dotnet/sdk:5.0 as build-env

# Ensure we listen on any IP Address 
ENV DOTNET_URLS=http://+:5000

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app/src

# Copy the rest of the backend source code
COPY . /app/src/

# Install all .NET dependencies
RUN dotnet restore

# Run publish project
RUN dotnet publish -c Release -o /app/src/publish

FROM mcr.microsoft.com/dotnet/sdk:5.0 as runtime

# Prepare Dotnet Entity Framework
RUN dotnet tool install --global dotnet-ef --version 5.0.17
ENV PATH="${PATH}:/root/.dotnet/tools"

WORKDIR /app/src/publish
COPY --from=build-env /app/src/publish .

WORKDIR /app/src

# Expose all ports
EXPOSE 5000

ENTRYPOINT ["dotnet", "run"]