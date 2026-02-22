import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskFormData, taskSchema } from "../../core/validation/taskSchema";
import { useTaskStore } from "../store/useTaskStore";

export const TaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const isOnline = useTaskStore((state) => state.isOnline);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = async (data: TaskFormData) => {
    await addTask(data.title, data.description);
    reset();
  };

  return (
    <View style={styles.card}>
      {/* Input de Título */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="bookmark-outline"
          size={20}
          color="#38BDF8"
          style={styles.icon}
        />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="¿Qué tarea tienes pendiente?"
              placeholderTextColor="#64748B"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      {/* Input de Descripción */}
      <View style={[styles.inputGroup, { borderBottomWidth: 0, marginTop: 5 }]}>
        <Ionicons
          name="reader-outline"
          size={20}
          color="#94A3B8"
          style={styles.icon}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Añade detalles adicionales..."
              placeholderTextColor="#475569"
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.statusInfo}>
          <Ionicons
            name={isOnline ? "cloud-done-outline" : "cloud-offline-outline"}
            size={16}
            color={isOnline ? "#4ADE80" : "#F87171"}
          />
          <Text
            style={[
              styles.statusText,
              { color: isOnline ? "#4ADE80" : "#F87171" },
            ]}
          >
            {isOnline ? "Cloud Sync Active" : "Local Database Only"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitBtnText}>Añadir</Text>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingVertical: 5,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: "#F8FAFC", fontSize: 16, paddingVertical: 8 },
  descriptionInput: { fontSize: 14, color: "#94A3B8", minHeight: 40 },
  errorText: {
    color: "#FB7185",
    fontSize: 11,
    marginTop: 5,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  statusInfo: { flexDirection: "row", alignItems: "center" },
  statusText: {
    fontSize: 11,
    marginLeft: 6,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  submitBtn: {
    backgroundColor: "#0284C7",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  submitBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 4,
  },
});
