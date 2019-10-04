import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { map, forEach } from 'lodash';

const styles = StyleSheet.create({
  swimmerPoolName: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    fontSize: 20,
  },
  orderContainer: {
    paddingHorizontal: 30,
    paddingTop: 5,
    fontSize: 18,
  },
  detailContainer: {
    padding: 10,
  },
  detail: {
    paddingHorizontal: 5,
  },
});

const OrdersPDF = (props) => {
  const getOrderInfo = (order) => {
    const orderInfo = map(order.orderDetails, (detail, i) => {
      return (
        <View key={i} style={styles.detailContainer}>
          <Text style={styles.detail}>
            Item: {detail.itemName}
          </Text>
          <Text style={styles.detail}>
            Qty: {detail.qty}
          </Text>
          <Text style={styles.detail}>
            Type: {detail.size || detail.color}
          </Text>
        </View>
      )
    });
    return orderInfo;
  }
  const getPage = () => {
    const page = [];
    forEach(props.orders, (order, i) => {
      if(order.poolId === props.poolId) {
        page.push(
          <Page key={i}>
            <View style={{flexDirection: "row"}}>
              <View>
                <Text style={styles.swimmerPoolName}>{order.last}, {order.first}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={styles.swimmerPoolName}>{order.pool}</Text>
              </View>
            </View>
            <View style={styles.orderContainer}>
              {getOrderInfo(order)}
            </View>
          </Page>
        );
      }
    });
    return page;
  }
  return (
    <PDFViewer style={{width: '100%', height: '50vh'}}>
      <Document title={props.title}>
        {/* <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Hello World!</Text>
          </View>
        </Page>
        <Page>
          <View style={styles.section}>
            <Text>We're inside a PDF!</Text>
          </View>
        </Page> */}
        {
          getPage()
          // map(props.orders, (order, i) => {
          //   return (
          //     <Page key={i}>
          //       <View style={{flexDirection: "row"}}>
          //         <View>
          //           <Text style={styles.swimmerPoolName}>{order.last}, {order.first}</Text>
          //         </View>
          //         <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          //           <Text style={styles.swimmerPoolName}>{order.pool}</Text>
          //         </View>
          //       </View>
          //       <View style={styles.orderContainer}>
          //         {getOrderInfo(order)}
          //       </View>
          //     </Page>
          //   )
          // })
        }
      </Document>
    </PDFViewer>
  )
}

export default OrdersPDF;
