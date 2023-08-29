import rfs from "rotating-file-stream";
import { format } from "date-fns";

function getFormattedDate() {
  return format(new Date(), "dd-MM-yyyy");
}

export default function createFileStream({ destination }) {
  const formatted = `${getFormattedDate()}-logfile.log`;
  console.log(formatted);
  return rfs.createStream(formatted, {
    interval: "1m",
    compress: "gzip",
    path: destination, // Certifique-se de que a propriedade 'destination' esteja sendo passada corretamente
  });
}
