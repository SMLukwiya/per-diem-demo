# PDF Reader with AI-powered Text Extraction

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yourusername/yourprojectname/blob/master/LICENSE)

Welcome to this simple PDF Reader Demo, a simple Next.js project that leverages artificial intelligence (AI) to extract text from PDF files and store it into a database. This could be a perfect fit for Per Diem, a user can simply upload their menu and the AI does the text extraction tasks in a seamless, efficient, by utilizing machine learning algorithms. This can be a nice value addition.

## Features

- **AI-powered Text Extraction**: This project uses GPT-3 language processing (NLP) techniques to extract text from PDF files with high accuracy and reliability. It can handle a wide range of PDF formats and layouts, making it suitable for various use cases.

- **Easy-to-Use**: The project is implemented in Next.js and Open AI and provides a simple and intuitive interface that allows a user to upload a pdf menu,and the text is extracted within seconds.

- **Database Integration**: This PDF Reader saves the extracted data directly into prisma using a defined schema, it therefore can integrate with databases such as MySQL, PostgreSQL, SQLite, and MongoDB.

## Installation

To try out the project, Open a terminal and run the following command:

```sh
git clone git@github.com:SMLukwiya/per-diem-demo.git
cd per-diem-demo
docker-compose up -d
npm install
```

> Look at the .env.example for the required env variables to be able to run the project locally.

### Usage

Simply run the application on localhost and the flow will be very intuitive.

You can customize the text extraction process by specifying parameters such as the language model, confidence threshold, and ROIs. Please refer to the [documentation](https://github.com/yourusername/yourprojectname/blob/master/docs/user_guide.md) for more information.

### License

PDF Reader Demo is open-source software released under the [MIT License](https://github.com/yourusername/yourprojectname/blob/master/LICENSE).

### Contact

If you have any questions or feedback, please feel free to contact us at [sundaymorganl@gmail.com](mailto: sundaymorganl@gmail.com)
