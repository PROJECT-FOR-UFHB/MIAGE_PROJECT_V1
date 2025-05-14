// Importation des fonctions de test de Vitest
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Importation de Vue Test Utils pour monter les composants Vue
import { mount } from '@vue/test-utils'

// Composant à tester
import LogoutButton from '@/components/auth/LogoutButton.vue'

// Importation des dépendances qu'on va simuler (mock)
import { authService } from '@/services'
import flushPromises from 'flush-promises';


// On crée un faux router avec une méthode push mockée
const pushMock = vi.fn()
/**Imaginons vi.fn() comme une télécommande.

Si tu fais useRouter: () => ({ push: vi.fn() }), alors chaque appel donne une nouvelle télécommande.
→ Le composant utilise une télécommande que toi, tu n’as pas en main.

En mettant const pushMock = vi.fn() avant, tout le monde utilise la même télécommande.
→ Tu peux vérifier ce que le composant a fait avec ta propre télécommande. */
// Simule le service d'authentification avec une méthode logout

vi.mock('@/services', () => ({
  authService: {
    logout: vi.fn() // mock de la fonction logout
  }
}))

describe('LogoutButton.vue', () => {
    let wrapper // pour stocker le wrapper du composant monté
    beforeEach(() => {
    wrapper = mount(LogoutButton,{
      global: {
        stubs: {
          'font-awesome-icon': true
        }
      }})    // On "monte" le composant dans un wrapper de test
    // On dit que useRouter doit retourner cet objet quand il est appelé
    vi.mock('vue-router', () => ({
      useRouter: () => ({ push: pushMock })
    }))
    })

    it('affiche le texte correct par défaut', () => {
    // Vérifie que le texte "Se déconnecter" est affiché quand loading = false
    expect(wrapper.text()).toContain('Se déconnecter')
    })

    it('affiche "Déconnexion..." pendant le chargement', async () => {
        // Simule un logout qui prend du temps (setTimeout)
        authService.logout.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

        // Simule un clic sur le bouton
        await wrapper.find('button').trigger('click')

        // Vérifie que le texte a changé pendant l’appel asynchrone
        expect(wrapper.text()).toContain('Déconnexion...')
    })

    it('appelle authService.logout et redirige', async () => {

    

    // Simule un logout réussi
    authService.logout.mockResolvedValue()


    // Clic sur le bouton
    await wrapper.find('button').trigger('click')
    await flushPromises();

    // Mount the component and stub <font-awesome-icon>
    // Vérifie que logout a été appelé
    expect(authService.logout).toHaveBeenCalled()

    // Vérifie que la redirection a eu lieu vers /auth/login
    expect(pushMock).toHaveBeenCalledWith('/auth/login')
    })

  it('force la déconnexion si logout échoue', async () => {
    // Simule un état du localStorage avant le test
    localStorage.setItem('auth_token', 'dummy')
    localStorage.setItem('user', 'John')
    localStorage.setItem('user_role', 'admin')

    // Simule un logout qui échoue
    authService.logout.mockRejectedValue(new Error('Erreur'))

    // Clic sur le bouton
    await wrapper.find('button').trigger('click')

    // Vérifie que le localStorage est vidé manuellement
    expect(localStorage.getItem('auth_token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('user_role')).toBeNull()

    // Vérifie que la redirection vers la page de connexion est faite malgré l’erreur
    expect(pushMock).toHaveBeenCalledWith('/auth/login')
  })
})
