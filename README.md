# RustBucketJS

RustBucketJS is an npm package that provides a simple and efficient way to interact with a backend API for file operations. It supports uploading files, downloading files, retrieving file names, and deleting files from the Rust-Bucket backend service.

## Installation

You can install RustBucketJS via npm:

```bash
npm i rustbucketjs
```

For more information, visit the [RustBucketJS npm page](https://www.npmjs.com/package/rustbucketjs?activeTab=readme).

## Usage

Here is an example of how to use RustBucket in your project:

```javascript
import RustBucket from 'rustbucketjs';

const rustBucket = new RustBucket('http://your-api-url');

// Upload a file
const file = document.querySelector('input[type="file"]').files[0];
rustBucket.uploadFile(file)
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Download a file
rustBucket.downloadFile('example.txt')
    .then(blob => {
        // Do something with the blob
    })
    .catch(error => console.error(error));

// Get file names
rustBucket.getFileNames()
    .then(fileNames => console.log(fileNames))
    .catch(error => console.error(error));

// Delete files
const fileNamesToDelete = ['example1.txt', 'example2.txt'];
rustBucket.deleteFiles(fileNamesToDelete)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

## API

### constructor(url: string)
Creates a new instance of RustBucket.

* url: The base URL of the backend API.

### async uploadFile(file: File): Promise<string>
Uploads a file to the backend.

* file: The file to be uploaded.
* Returns: A promise that resolves to a string message.

### async downloadFile(fileName: string): Promise<Blob>
Downloads a file from the backend.

* fileName: The name of the file to be downloaded.
* Returns: A promise that resolves to a Blob.

### async getFileNames(): Promise<object[string]>
Retrieves the names of all files stored in the backend.

* Returns: A promise that resolves to an object containing the file names.

### async deleteFiles(fileNames: object[string]): Promise<string>
Deletes files from the backend.

* fileNames: An object containing the names of the files to be deleted.
* Returns: A promise that resolves to a string message.

## Error Handling
The methods in RustBucketJS throw errors if the input is invalid or if the backend API returns an error. Ensure you handle these errors using .catch or try...catch blocks or async/await.

## Example
Here is an example of how to handle errors:

```javascript
rustBucket.uploadFile(file)
    .then(response => console.log(response))
    .catch(error => console.error('Error uploading file:', error));
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License. See the LICENSE.md file for details.
