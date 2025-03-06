let currentCategory = 'all';
let shownRecipes = new Set(); // Track shown recipes

function setCategory(category) {
    currentCategory = category;
    shownRecipes.clear(); // Reset shown recipes when changing category
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category)) {
            btn.classList.add('active');
        }
    });
}

function getFilteredRecipes() {
    if (currentCategory === 'all') {
        return recipes;
    }
    return recipes.filter(recipe => recipe.category === currentCategory);
}

function createIngredientElement(ingredient) {
    return `<li>${ingredient}</li>`;
}

function formatInstruction(instruction) {
    // If the instruction ends with a colon, it's a section header
    if (instruction.endsWith(':')) {
        return `<li class="section-header">${instruction}</li>`;
    }
    return `<li>${instruction}</li>`;
}

function generateRecipe() {
    const recipeCard = document.getElementById('recipeCard');
    const filteredRecipes = getFilteredRecipes();
    
    if (filteredRecipes.length === 0) {
        alert('Ingen oppskrifter funnet i denne kategorien. Prøv en annen kategori!');
        return;
    }

    // If all recipes have been shown, reset the tracking
    if (shownRecipes.size >= filteredRecipes.length) {
        shownRecipes.clear();
    }
    
    // Remove active class to trigger animation
    recipeCard.classList.remove('active');
    
    // Update content after a short delay to allow animation to play
    setTimeout(() => {
        // Get available recipes (not shown yet)
        const availableRecipes = filteredRecipes.filter(recipe => !shownRecipes.has(recipe.title));
        
        // Select a random recipe from available ones
        const randomIndex = Math.floor(Math.random() * availableRecipes.length);
        const recipe = availableRecipes[randomIndex];
        
        // Mark this recipe as shown
        shownRecipes.add(recipe.title);
        
        // Update recipe title and meta information
        document.querySelector('.recipe-title').textContent = recipe.title;
        document.querySelector('.prep-time').textContent = `Tilberedningstid: ${recipe.prepTime}`;
        document.querySelector('.recipe-cuisine').textContent = recipe.cuisine;
        
        // Update ingredients list
        const ingredientsList = document.querySelector('.ingredients');
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        
        // Update instructions list with formatted section headers
        const instructionsList = document.querySelector('.instructions');
        instructionsList.innerHTML = '';
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            if (instruction.endsWith(':')) {
                li.className = 'section-header';
                li.textContent = instruction;
            } else {
                li.textContent = instruction;
            }
            instructionsList.appendChild(li);
        });
        
        // Add active class to trigger animation
        recipeCard.classList.add('active');
    }, 300);
}

// Initialize with a random recipe
document.addEventListener('DOMContentLoaded', generateRecipe); 