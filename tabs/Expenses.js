import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View, Button } from "react-native";
import { ref, onValue, push, child, update } from "firebase/database";
import { database } from "../App";

export function Expenses({ user }) {
  const [expensesList, setExpensesList] = useState([
    { date: "28.11.2021", title: "qefv", cost: "12" },
    { date: "28.11.2021", title: "qefv", cost: "12" },
  ]);

  async function addExpenses() {
   

    const ex={
          data:"28.11.2021",
          title:'jberv',
          cost:'10'
      }

      const newExpKey = push(child(ref(database), 'users/' + user.uid + '/11-2021')).key;
      const updates = {
          ['users/' + user.uid + '/11-2021/' + newExpKey]:ex
      };
      update(ref(database), updates).then(()=>{alert('success')}).catch((error)=>{alert(error.message)});
  }

  useEffect(() => {
    (async () => {
      if (user) {
        const expensesRef = ref(database, "users/" + user.uid + "/11-2021");
        onValue(expensesRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setExpensesList(data ? Object.values(data) : null);
        }).catch((error)=>{alert(error.message)});
      }
    })();
  }, [user]);

  return (
    <SafeAreaView>
      <Text>Expenses</Text>
      <FlatList
        data={expensesList ? expensesList : []}
        renderItem={({ item }) => (
          <View>
            <Text>{item.date}</Text>
            <Text>{item.title}</Text>
            <Text>{item.cost}</Text>
          </View>
        )}
      />
      <Button title="add expenses" onPress={addExpenses}></Button>
    </SafeAreaView>
  );
}
