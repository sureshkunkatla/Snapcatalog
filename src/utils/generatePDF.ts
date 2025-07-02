import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { imageItem } from '../redux/imageSlice';
import RNBlobUtil from 'react-native-blob-util';
import { Platform, Alert } from 'react-native';
import { requestStoragePermission } from './storagePermission';
import { orgDetailsType } from '../redux/orgDetailsSlice';

export const generatePDF = async (
  images: imageItem[],
  orgDetails: orgDetailsType
) => {
  const hasPermission = await requestStoragePermission();

  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Cannot generate or save PDF without permission.'
    );
    return null;
  }

  const chunkSize = 4;
  const pages = [];

  const totalPages = Math.ceil(images.length / chunkSize);

  for (let i = 0; i < images.length; i += chunkSize) {
    const pageIndex = Math.floor(i / chunkSize) + 1;
    const chunk = images.slice(i, i + chunkSize);

    const rows = [0, 1].map((rowIdx) => {
      const rowItems = chunk.slice(rowIdx * 2, rowIdx * 2 + 2);
      const cols = rowItems
        .map(
          (img) => `
            <td style="text-align:center; padding:10px;">
              <img src="${img.uri}" width="286" height="400" style="object-fit:cover;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);" />
              <p style="margin-top:5px;font-weight:bold;font-size:18px">${img.name}</p>
            </td>
          `
        )
        .join('');
      return `<tr>${cols}</tr>`;
    });

    const table = `
      <table style="width:100%; height:85vh; border-collapse:collapse;display:flex;flex-direction:row;justify-content:space-evenly;align-items:flex-start">
        ${rows.join('')}
      </table>
    `;

    const header = `
      <table style="width:100%; margin-bottom:10px;">
        <tr>
          <td>
            <h1 style="margin:0; font-size:24px; color:#0CAD79;">${orgDetails.orgName}</h1>
            <p style="margin:0; font-size:14px; color:#0CAD79;">${orgDetails.address}</p>
          </td>
          <td style="text-align:right;">
            <p style="margin:0; font-size:14px; color:#0CAD79;">Contact: ${orgDetails.contactName}</p>
            <p style="margin:0; font-size:14px; color:#0CAD79;">Number: ${orgDetails.contactNumber}</p>
          </td>
        </tr>
      </table>
      <hr style="margin: 10px 0;" />
    `;

    const footer = `
      <div style="text-align:center; font-size:12px; color:gray; margin-top:10px;">
        Page ${pageIndex} of ${totalPages}
      </div>
    `;

    pages.push(`${header}${table}${footer}`);
  }

  const html = `
    <html>
      <body style="font-family:sans-serif; padding:10px;">
        ${pages
          .map(
            (pageHtml) => `
          <div style="page-break-after:always; ">
            ${pageHtml}
          </div>
        `
          )
          .join('')}
      </body>
    </html>
  `;

  const options = {
    html,
    fileName: 'ProductsListPDF',
    directory: 'Documents',
  };

  const file = await RNHTMLtoPDF.convert(options);

  // if (Platform.OS === 'android') {
  //   const downloadsPath = RNBlobUtil.fs.dirs.DownloadDir + '/ImagesGrid.pdf';
  //   await RNBlobUtil.fs.cp(file.filePath!, downloadsPath);
  //   return downloadsPath;
  // }

  return file.filePath;
};