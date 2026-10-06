cmake_minimum_required(VERSION 3.24)
project(ghufran_laptop_server VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(Crow CONFIG REQUIRED)
find_package(unofficial-libmariadb CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)

add_executable(ghufran-server
  backend/src/main.cpp
  backend/src/database.cpp
  backend/src/security.cpp
)
target_include_directories(ghufran-server PRIVATE backend/src)
target_link_libraries(ghufran-server PRIVATE
  Crow::Crow
  unofficial::libmariadb
  OpenSSL::Crypto
  nlohmann_json::nlohmann_json
)
if(WIN32)
  target_link_libraries(ghufran-server PRIVATE ws2_32)
endif()

configure_file(.env.example .env.example COPYONLY)
