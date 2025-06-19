import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, QuerySnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions, StatusBar, Animated } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

// TodoItem component to handle individual todo items
const TodoItem = ({ item, index }: { item: Todo; index: number }) => {
  const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
  const [itemAnim] = useState(new Animated.Value(0));
  
  React.useEffect(() => {
    Animated.spring(itemAnim, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleDone = async () => {
    await updateDoc(ref, { done: !item.done });
  };

  const deleteItem = async () => {
    Animated.timing(itemAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      deleteDoc(ref);
    });
  };

  return (
    <Animated.View 
      style={[
        styles.todoCard,
        {
          opacity: itemAnim,
          transform: [
            {
              translateY: itemAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.todoContent, item.done && styles.completedTodoContent]}>
        <TouchableOpacity 
          onPress={toggleDone} 
          style={[styles.checkbox, item.done && styles.checkedCheckbox]}
        >
          {item.done && (
            <Ionicons name="checkmark-sharp" size={18} color="#fff" />
          )}
        </TouchableOpacity>
        
        <View style={styles.todoTextContainer}>
          <Text style={[
            styles.todoText, 
            item.done && styles.completedText
          ]}>
            {item.title}
          </Text>
          {item.done && <View style={styles.strikethrough} />}
        </View>

        <TouchableOpacity onPress={deleteItem} style={styles.deleteBtn}>
          <MaterialIcons name="delete-outline" size={24} color="#ff4757" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export interface Todo{
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
    const [todos, setTodos] = React.useState<Todo []>([]);
    const [todo, setTodo] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    
    // access firebase database
    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscribe = onSnapshot(todoRef, {
            next: (snapshot: QuerySnapshot<DocumentData>) => {
                console.log('UPDATED');
                const todos: { id: string; title?: string; done?: boolean }[] = [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    }); 
                });
                setTodos(todos);
            },
        });

        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        return () => subscribe();
    }, []);

    const addTodo = async () => {
        if (todo.trim()) {
            const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo.trim(), done: false});
            setTodo('');
        }
    };

    const renderTodo = ({ item, index }: any) => {
      return <TodoItem item={item} index={index} />;
    };

    const completedCount = todos.filter(todo => todo.done).length;
    const totalCount = todos.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fe" />
        
        {/* Header Section */}
        <Animated.View style={[styles.headerSection, { opacity: fadeAnim }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Hello! 👋</Text>
              <Text style={styles.headerTitle}>What's on your mind?</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsNumber}>{completedCount}</Text>
              <Text style={styles.statsLabel}>Done</Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {totalCount > 0 ? `${Math.round(progressPercentage)}% Complete` : 'No tasks yet'}
            </Text>
          </View>
        </Animated.View>

        {/* Input Section */}
        <Animated.View style={[styles.inputSection, { opacity: fadeAnim }]}>
          <View style={styles.inputCard}>
            <AntDesign name="plus" size={20} color="#6c5ce7" style={styles.inputIcon} />
            <TextInput
              placeholder="Add a new task..."
              placeholderTextColor="#a0a3bd"
              onChangeText={(text: string) => setTodo(text)}
              value={todo}
              style={styles.textInput}
              onSubmitEditing={addTodo}
              returnKeyType="done"
            />
            <TouchableOpacity 
              style={[styles.addButton, todo.trim() === '' && styles.addButtonDisabled]} 
              onPress={addTodo}
              disabled={todo.trim() === ''}
            >
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Tasks List */}
        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>
            {todos.length > 0 ? `Your Tasks (${todos.length})` : 'Ready to be productive?'}
          </Text>
          
          {todos.length > 0 ? (
            <FlatList 
              data={todos} 
              renderItem={renderTodo} 
              keyExtractor={(todo: Todo) => todo.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.todosList}
            />
          ) : (
            <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="clipboard-outline" size={80} color="#ddd6fe" />
              </View>
              <Text style={styles.emptyTitle}>No tasks yet!</Text>
              <Text style={styles.emptySubtitle}>Add your first task above to get started</Text>
            </Animated.View>
          )}
        </View>
      </View>
    );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fe',
  },
  headerSection: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#74b9ff',
    fontWeight: '500',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  statsContainer: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 70,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f2f6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
  },
  inputSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#ddd6fe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
    paddingVertical: 4,
  },
  addButton: {
    backgroundColor: '#6c5ce7',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  addButtonDisabled: {
    backgroundColor: '#ddd6fe',
  },
  tasksSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  todosList: {
    paddingBottom: 100,
  },
  todoCard: {
    marginBottom: 12,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#ddd6fe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6c5ce7',
  },
  completedTodoContent: {
    backgroundColor: '#f8f9fe',
    borderLeftColor: '#00b894',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ddd6fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkedCheckbox: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  todoTextContainer: {
    flex: 1,
    position: 'relative',
  },
  todoText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
  },
  completedText: {
    color: '#74b9ff',
  },
  strikethrough: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#74b9ff',
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff5f5',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f8f9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ddd6fe',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#a0a3bd',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});