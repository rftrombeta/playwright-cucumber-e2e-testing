import { Page, Locator } from '@playwright/test';

/**
 * Page Elements for Cart and Checkout Pages
 * 
 * Centraliza todos os locators (seletores) do carrinho e checkout do Sauce Labs
 * https://www.saucedemo.com/
 * 
 * Contém locators para:
 * - Badge do carrinho (contador)
 * - Página do carrinho
 * - Checkout (informações)
 * - Checkout overview (resumo)
 * - Checkout complete (finalização)
 * 
 * **Observação:** Todas as propriedades desta classe são `readonly Locator`
 * 
 * @class CartElements
 * @param {Page} page - Instância da página Playwright
 * 
 * @example
 * const cartElements = new CartElements(page);
 * await cartElements.cartBadge.isVisible();
 * await cartElements.checkoutButton.click();
 */
export class CartElements {
    readonly page: Page;

    // ==================== Badge do Carrinho (Navbar) ====================

    /** Ícone/Link do carrinho no topo da página */
    readonly cartLink: Locator;

    /** Badge com o número de itens no carrinho (ex: "2") */
    readonly cartBadge: Locator;

    // ==================== Botões de Produto ====================

    /** Botão "Add to cart" (genérico - filtrar por produto) */
    readonly addToCartButton: Locator;

    /** Botão "Remove" (genérico - filtrar por produto) */
    readonly removeButton: Locator;

    // ==================== Página do Carrinho ====================

    /** Título "Your Cart" */
    readonly cartTitle: Locator;

    /** Lista de itens no carrinho */
    readonly cartList: Locator;

    /** Item individual do carrinho (múltiplos) */
    readonly cartItem: Locator;

    /** Nome do produto no carrinho */
    readonly cartItemName: Locator;

    /** Preço do produto no carrinho */
    readonly cartItemPrice: Locator;

    /** Quantidade do produto no carrinho */
    readonly cartItemQuantity: Locator;

    /** Botão "Continue Shopping" */
    readonly continueShoppingButton: Locator;

    /** Botão "Checkout" */
    readonly checkoutButton: Locator;

    // ==================== Checkout - Informações do Cliente ====================

    /** Título "Checkout: Your Information" */
    readonly checkoutInfoTitle: Locator;

    /** Campo First Name */
    readonly firstNameInput: Locator;

    /** Campo Last Name */
    readonly lastNameInput: Locator;

    /** Campo Zip/Postal Code */
    readonly postalCodeInput: Locator;

    /** Botão "Continue" na página de informações */
    readonly continueButton: Locator;

    /** Botão "Cancel" na página de informações */
    readonly cancelButton: Locator;

    // ==================== Checkout Overview (Resumo) ====================

    /** Título "Checkout: Overview" */
    readonly checkoutOverviewTitle: Locator;

    /** Informação de pagamento */
    readonly paymentInformation: Locator;

    /** Informação de envio */
    readonly shippingInformation: Locator;

    /** Subtotal dos itens */
    readonly itemTotal: Locator;

    /** Taxa (tax) */
    readonly tax: Locator;

    /** Total final */
    readonly total: Locator;

    /** Botão "Finish" */
    readonly finishButton: Locator;

    // ==================== Checkout Complete (Finalização) ====================

    /** Título "Checkout: Complete!" */
    readonly checkoutCompleteTitle: Locator;

    /** Header de sucesso: "Thank you for your order!" */
    readonly completeHeader: Locator;

    /** Texto de sucesso: "Your order has been dispatched..." */
    readonly completeText: Locator;

    /** Imagem de sucesso (pony icon) */
    readonly completeImage: Locator;

    /** Botão "Back Home" */
    readonly backHomeButton: Locator;

    // ==================== Métodos Helper para Locators Dinâmicos ====================

    /**
     * Retorna o item de inventário (produto) pelo nome
     * 
     * @param {string} productName - Nome do produto
     * @returns {Locator} Locator do item de inventário
     * 
     * @example
     * const productItem = elements.getInventoryItem('Sauce Labs Backpack');
     */
    getInventoryItem(productName: string): Locator {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: productName })
            .first();
    }

    /**
     * Retorna o botão "Add to cart" de um produto específico na página de produtos
     * 
     * @param {string} productName - Nome do produto
     * @returns {Locator} Locator do botão Add to cart
     * 
     * @example
     * const addButton = elements.getAddToCartButton('Sauce Labs Backpack');
     */
    getAddToCartButton(productName: string): Locator {
        const productItem = this.getInventoryItem(productName);
        return productItem.locator('button[data-test*="add-to-cart"]');
    }

    /**
     * Retorna o botão "Remove" de um produto específico na página de produtos
     * 
     * @param {string} productName - Nome do produto
     * @returns {Locator} Locator do botão Remove
     * 
     * @example
     * const removeButton = elements.getRemoveButtonFromInventory('Sauce Labs Backpack');
     */
    getRemoveButtonFromInventory(productName: string): Locator {
        const productItem = this.getInventoryItem(productName);
        return productItem.locator('button[data-test*="remove"]');
    }

    /**
     * Retorna o botão "Remove" de um produto específico na página do carrinho
     * Usa conversão para slug baseado no padrão do Sauce Labs
     * 
     * @param {string} productName - Nome do produto
     * @returns {Locator} Locator do botão Remove no carrinho
     * 
     * @example
     * const removeButton = elements.getRemoveButtonFromCart('Sauce Labs Bolt T-Shirt');
     * // Procura: [data-test="remove-sauce-labs-bolt-t-shirt"]
     */
    getRemoveButtonFromCart(productName: string): Locator {
        const slug = productName
            .toLowerCase()
            .replace(/\s+/g, '-');

        return this.page.locator(`[data-test="remove-${slug}"]`);
    }

    constructor(page: Page) {
        this.page = page;

        // ==================== Badge do Carrinho ====================
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

        // ==================== Botões de Produto ====================
        this.addToCartButton = page.locator('button[data-test*="add-to-cart"]');
        this.removeButton = page.locator('button[data-test*="remove"]');

        // ==================== Página do Carrinho ====================
        this.cartTitle = page.locator('[data-test="title"]').filter({ hasText: 'Your Cart' });
        this.cartList = page.locator('[data-test="cart-list"]');
        this.cartItem = page.locator('[data-test="cart-item"]');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.cartItemQuantity = page.locator('.cart_quantity');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

        // ==================== Checkout - Informações ====================
        this.checkoutInfoTitle = page.locator('[data-test="title"]').filter({ hasText: 'Checkout: Your Information' });
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        // ==================== Checkout Overview ====================
        this.checkoutOverviewTitle = page.locator('[data-test="title"]').filter({ hasText: 'Checkout: Overview' });
        this.paymentInformation = page.locator('[data-test="payment-info-value"]');
        this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');

        // ==================== Checkout Complete ====================
        this.checkoutCompleteTitle = page.locator('[data-test="title"]').filter({ hasText: 'Checkout: Complete!' });
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.completeImage = page.locator('[data-test="pony-express"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
}
