import csvtojson from 'csvtojson';

interface Lead {
  name: string;
  email: string;
  url?: string;
}

const csvParser = async (buffer: Buffer): Promise<Lead[]> => {
  const jsonArray = await csvtojson().fromString(buffer.toString());
  return jsonArray.map(({ name, email, url }) => ({ name, email, url }));
};

export default csvParser;