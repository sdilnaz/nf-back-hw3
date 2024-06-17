## Installation

1. **Clone the repository:**
git clone https://github.com/your-username/amazon-publications-parser.git
cd amazon-publications-parser



2. **Install dependencies:**

npm install



3. **Set up environment variables:**

Rename '.env.example' to `.env` file in the root directory with the following variables:
MONGO_URI=your_mongo_connection_string
PORT=3000

## Usage

1. **To test:**
   npx ts-node src/testParser.ts
