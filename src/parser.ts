import axios from 'axios';
import cheerio from 'cheerio';
import Publication from './models';

// Function to fetch the HTML from a given URL
const fetchHTML = async (url: string): Promise<string> => {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
  });
  return data;
};

// Function to parse the HTML and extract the desired information
const parseHTML = (html: string) => {
  const $ = cheerio.load(html);
  const publications: any[] = [];

  // Adjust the selectors based on the actual structure of the Amazon page
  $('.s-main-slot .s-result-item').each((i, element) => {
    const title = $(element).find('h2 a span').text().trim();
    const link = 'https://www.amazon.com' + $(element).find('h2 a').attr('href');
    const authorElement = $(element).find('.a-row.a-size-base.a-color-secondary .a-row .a-size-base').first();
    const author = authorElement.length ? authorElement.text().trim() : 'Unknown';
    const publishedDate = new Date(); // You may need to extract or calculate the actual date

    console.log(`Extracted title: ${title}`);
    console.log(`Extracted author: ${author}`);
    console.log(`Extracted link: ${link}`);

    if (title && author) {
      publications.push({ title, author, link, publishedDate });
    } else {
      console.warn(`Missing title or author for item: ${link}`);
    }
  });

  return publications;
};

// Function to fetch and parse the latest publications
export const fetchLatestPublications = async () => {
  try {
    const url = 'https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A502394&ref=nav_em__nav_desktop_sa_intl_camera_and_photo_0_2_5_3';
    const html = await fetchHTML(url);
    const publications = parseHTML(html);

    for (const pub of publications) {
      const existingPub = await Publication.findOne({ link: pub.link });
      if (!existingPub) {
        await new Publication(pub).save();
      }
    }

    return publications;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};
