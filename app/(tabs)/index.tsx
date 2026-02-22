import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import { TaskForm } from "../../src/presentation/components/TaskForm";
import { useTaskStore } from "../../src/presentation/store/useTaskStore";

export default function HomeScreen() {
  const { tasks, loadTasks, toggleTask, deleteTask } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Tasks</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {tasks.filter((t) => !t.isCompleted).length} pendientes
          </Text>
        </View>
      </View>

      <TaskForm />

      <Animated.FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={Layout.springify()}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100)}
            exiting={FadeOutRight}
            style={[styles.taskCard, item.isCompleted && styles.taskCompleted]}
          >
            <TouchableOpacity
              style={styles.checkArea}
              onPress={() => toggleTask(item.id)}
            >
              <Ionicons
                name={item.isCompleted ? "checkmark-circle" : "ellipse-outline"}
                size={28}
                color={item.isCompleted ? "#4ADE80" : "#94A3B8"}
              />
              <View style={styles.textContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.isCompleted && styles.textStrike,
                  ]}
                >
                  {item.title}
                </Text>
                {item.description && (
                  <Text style={styles.taskDesc}>{item.description}</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={20} color="#F87171" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#F8FAFC" },
  badge: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  badgeText: { color: "#38BDF8", fontSize: 12, fontWeight: "bold" },
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  taskCompleted: { opacity: 0.6, backgroundColor: "#0F172A" },
  checkArea: { flexDirection: "row", alignItems: "center", flex: 1 },
  textContent: { marginLeft: 12, flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#F8FAFC" },
  taskDesc: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  textStrike: { textDecorationLine: "line-through", color: "#64748B" },
  deleteBtn: { padding: 8, backgroundColor: "#2D1B1E", borderRadius: 10 },
});
