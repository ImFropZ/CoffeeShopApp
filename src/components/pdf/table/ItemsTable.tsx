import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "auto",
  },
});

const ItemsTable = <T extends object>({ data }: { data: { items: T[] } }) => (
  <View style={styles.tableContainer}>
    <TableHeader item={data.items[0] || {}} />
    <TableRow items={data.items} />
  </View>
);

export default ItemsTable;
