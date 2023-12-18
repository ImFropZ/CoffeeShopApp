import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import { IInvoiceItem } from "./types";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
});

const Table = <T extends IInvoiceItem>({ data }: { data: { items: T[] } }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <ItemsTable data={data} />
    </Page>
  </Document>
);

export default Table;
