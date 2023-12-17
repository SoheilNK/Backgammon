const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream("../Deployments/output.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "Archiver has been finalized and the output file descriptor has closed."
  );
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

// Add files and folders here
archive.file("README.md");
archive.file("package-lock.json");
archive.file("package.json");
archive.file("tsconfig.json");
archive.directory(".ebextensions/");
archive.directory(".platform/");
archive.directory("build/");
archive.directory("dist/");
archive.directory("src/");

archive.finalize();
