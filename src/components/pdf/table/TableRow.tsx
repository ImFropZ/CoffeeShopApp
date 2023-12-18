import { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    fontSize: 14,
  },
});

const TableRow = <T extends object>({ items }: { items: T[] }) => {
  const rows = items.map((item, key) => (
    <View style={styles.row} key={key}>
      {Object.values(item).map((value) => {
        return <Text style={{ width: 100 / items.length + "%" }}>{value}</Text>;
      })}
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
