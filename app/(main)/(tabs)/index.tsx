import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const Campaign = () => {
  const data = [1, 2, 3, 5, 6, 7, 8];
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const calculateNumColumns = () => {
      if (width < 480) {
        return 1;
      } else if (width < 768) {
        return 2;
      } else {
        return 3;
      }
    };
    setNumColumns(calculateNumColumns());
  }, [width]);

  return (
    <FlatList
      key={numColumns}
      data={data}
      renderItem={() => (
        <Card style={Styles.container}>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover
            style={{
              margin: 10,
            }}
            source={{ uri: 'https://picsum.photos/700' }}
          />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      )}
      numColumns={numColumns}
    />
  );
};

export default Campaign;

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 10,
  },
});
