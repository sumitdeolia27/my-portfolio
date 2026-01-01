// Advanced animations and scroll effects
class AnimationController {
  constructor() {
    this.scrollY = 0
    this.isScrolling = false
    this.init()
  }

  init() {
    this.setupParallaxEffects()
    this.setupScrollTriggers()
    this.setupHoverEffects()
  }

  setupParallaxEffects() {
    window.addEventListener("scroll", () => {
      if (!this.isScrolling) {
        requestAnimationFrame(() => {
          this.updateParallax()
          this.isScrolling = false
        })
        this.isScrolling = true
      }
    })
  }

  updateParallax() {
    this.scrollY = window.pageYOffset

    // Parallax effect for hero section
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      const heroContent = heroSection.querySelector(".hero-content")
      if (heroContent) {
        const speed = 0.5
        heroContent.style.transform = `translateY(${this.scrollY * speed}px)`
      }
    }

    // Update navigation background opacity
    const navigation = document.getElementById("navigation")
    if (navigation) {
      const opacity = Math.min(this.scrollY / 100, 0.95)
      navigation.style.background = `rgba(15, 23, 42, ${opacity})`
    }
  }

  setupScrollTriggers() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerSectionAnimation(entry.target)
        }
      })
    }, observerOptions)

    // Observe sections for animations
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
      observer.observe(section)
    })
  }

  triggerSectionAnimation(section) {
    const sectionId = section.getAttribute("id")

    switch (sectionId) {
      case "about":
        this.animateAboutSection(section)
        break
      case "skills":
        this.animateSkillsSection(section)
        break
      case "projects":
        this.animateProjectsSection(section)
        break
      case "experience":
        this.animateExperienceSection(section)
        break
      default:
        this.animateGenericSection(section)
    }
  }

  animateAboutSection(section) {
    const stats = section.querySelectorAll(".stat-number")
    stats.forEach((stat, index) => {
      setTimeout(() => {
        this.animateCounter(stat)
      }, index * 200)
    })

    const highlights = section.querySelectorAll(".highlight-item")
    highlights.forEach((highlight, index) => {
      setTimeout(() => {
        highlight.style.opacity = "1"
        highlight.style.transform = "translateY(0) scale(1)"
      }, index * 100)
    })
  }

  animateSkillsSection(section) {
    const skillItems = section.querySelectorAll(".skill-item")
    skillItems.forEach((skill, index) => {
      setTimeout(() => {
        skill.style.opacity = "1"
        skill.style.transform = "translateY(0) scale(1)"
      }, index * 50)
    })
  }

  animateProjectsSection(section) {
    const projectCards = section.querySelectorAll(".project-card")
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0) scale(1)"
      }, index * 150)
    })
  }

  animateExperienceSection(section) {
    const experienceItems = section.querySelectorAll(".experience-item, .hackathon-item")
    experienceItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateX(0)"
      }, index * 100)
    })
  }

  animateGenericSection(section) {
    const elements = section.querySelectorAll(".education-item, .contact-item")
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.textContent)
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current) + "+"
    }, 16)
  }

  setupHoverEffects() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
      })
    })

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll(".skill-item")
    skillItems.forEach((skill) => {
      skill.addEventListener("mouseenter", () => {
        skill.style.transform = "translateY(-2px) scale(1.05)"
      })

      skill.addEventListener("mouseleave", () => {
        skill.style.transform = "translateY(0) scale(1)"
      })
    })

    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px)"
      })

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)"
      })
    })
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AnimationController()
})
