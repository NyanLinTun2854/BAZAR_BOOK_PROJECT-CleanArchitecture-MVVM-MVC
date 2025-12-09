import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryScreen from '@features/Category/Category/Category.view';
import SearchCategoryScreen from '@features/Category/SearchCategory/SearchCategory.view';
import {CategoryStackParamList} from '@navigation/types';

const CategoryStack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryStackScreens = () => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen name="Category" component={CategoryScreen} />
    <CategoryStack.Screen
      name="SearchCategory"
      component={SearchCategoryScreen}
    />
  </CategoryStack.Navigator>
);

export default CategoryStackScreens;
