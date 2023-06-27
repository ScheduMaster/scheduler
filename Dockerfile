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

# Download and install dotnet-ef
RUN curl -o dotnet-ef.tar.gz -SL https://aka.ms/efcore/global-tools/latest/linux-x64.tar.gz \
    && mkdir -p /tools/dotnet-ef \
    && tar -zxf dotnet-ef.tar.gz -C /tools/dotnet-ef \
    && rm dotnet-ef.tar.gz

# Add the tool to the PATH
ENV PATH="${PATH}:/tools/dotnet-ef"

# Run publish project
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0 as runtime

WORKDIR /app/publish
COPY --from=build-env /app/publish .

# Expose all ports
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "scheduler.dll"]