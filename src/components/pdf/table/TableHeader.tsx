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
    fontSize: 21,
    fontWeight: "bold",
    backgroundColor: "#646464",
    padding: 5,
  },
});

const TableHeader = <T extends object>({ item }: { item: T }) => {
  const rows = (
    <View style={styles.row}>
      {Object.keys(item).map((value) => {
        return (
          <Text
            style={{
              width: 100 / Object.keys(item).length + "%",
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {value}
          </Text>
        );
      })}
    </View>
  );
  return <Fragment>{rows}</Fragment>;
};

export default TableHeader;
