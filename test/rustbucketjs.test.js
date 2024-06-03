const assert = require('assert');
const RustBucket = require('../src/rustbucketjs.js');

describe('RustBucket', function() {
    const validUrl = 'localhost:8000';
    let rustBucket;

    beforeEach(function() {
        rustBucket = new RustBucket(validUrl);
    });

    describe('Constructor', function() {
        it('should create an instance with a valid URL', function() {
            assert.strictEqual(rustBucket.url, validUrl);
        });

        it('should throw an error with an invalid URL', function() {
            assert.throws(() => {
                new RustBucket(12345);
            }, Error);
        });
    });

    describe('uploadFile', function() {
        it('should throw an error with a non-File input', async function() {
            await assert.rejects(async () => {
                await rustBucket.uploadFile("not a file");
            }, { name: 'TypeError' });
        });

        it('should return a string on successful upload', async function() {
            global.fetch = async () => ({
                ok: true,
                statusText: "File uploaded successfully"
            });

            const file = new File(["content"], "test.txt", { type: "text/plain" });
            const result = await rustBucket.uploadFile(file);
            assert.strictEqual(result, "File uploaded successfully");
        });
    });

    describe('downloadFile', function() {
        it('should throw an error with a non-string fileName', async function() {
            await assert.rejects(async () => {
                await rustBucket.downloadFile(12345);
            }, { name: 'TypeError' });
        });

        it('should return a Blob on successful download', async function() {
            const mockBlob = new Blob(["file content"], { type: "text/plain" });

            // Mocking fetch response
            global.fetch = async () => ({
                ok: true,
                blob: async () => mockBlob
            });

            const result = await rustBucket.downloadFile("test.txt");
            assert(result instanceof Blob);
        });
    });

    describe('getFileNames', function() {
        it('should get file names', async function() {
            // Mocking fetch response
            global.fetch = async () => ({
                ok: true,
                text: async () => '["file1.txt", "file2.jpg"]'
            });

            const fileNames = await rustBucket.getFileNames();
            assert.deepStrictEqual(fileNames, ['file1.txt', 'file2.jpg']);
        });
    });

    describe('deleteFiles', function() {
        it('should throw an error with a non-Array input', async function() {
            await assert.rejects(async () => {
                await rustBucket.deleteFiles("not an Array");
            }, { name: 'Error' });
        });

        it('should return a string on successful deletion', async function() {
            global.fetch = async () => ({
                ok: true,
                statusText: "Files deleted successfully"
            });

            const result = await rustBucket.deleteFiles(["file1.txt", "file2.jpg"]);
            assert.strictEqual(result, "Files deleted successfully");
        });
    });
});
