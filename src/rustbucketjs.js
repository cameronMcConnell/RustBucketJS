class RustBucket {
    
    // Input => url: String
    constructor(url) {
        this.url = url
    }

    // Input => file: File
    // Return => String
    async uploadFile(file) {
        const formData = new FormData();
        
        formData.append("file", file);

        const response = await fetch(url + "/bucket/upload_file", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.statusText;
    }

    // Input => fileName: String
    // Return => Blob
    async downloadFile(fileName) {
        const response = await fetch(url + "/bucket/download_file/" + fileName);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const blob = await response.blob();

        return blob;
    }

    // Input => void
    // Return => List[String]
    async getFileNames() {
        const response = await fetch(url + "/bucket/get_file_names");

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const fileNameStr = await response.text();

        return JSON.parse(fileNameStr);
    }

    // Input => fileNames: List[String]
    // Return => String
    async deleteFiles(fileNames) {
        let urlList = "";

        for (let i = 0; i < fileNames.length - 1; i++) {
            urlList += fileNames[i] + ","
        }

        urlList += fileNames[fileNames.length - 1];

        const response = await fetch(url + "/bucket/deleteFiles?file_names=" + urlList, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.statusText;
    }
}

export default RustBucket;