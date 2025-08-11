import React, { useState } from 'react';
import { Play, Trophy, Users, Clock, Star, ChevronRight } from 'lucide-react';
import './Home.scss'; // Import the SCSS file

function Home() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Science', icon: '🔬', quizzes: 45, modifier: 'blue' },
    { id: 2, name: 'History', icon: '📚', quizzes: 32, modifier: 'green' },
    { id: 3, name: 'Sports', icon: '⚽', quizzes: 28, modifier: 'orange' },
    { id: 4, name: 'Movies', icon: '🎬', quizzes: 41, modifier: 'purple' },
    { id: 5, name: 'Geography', icon: '🌍', quizzes: 37, modifier: 'teal' },
    { id: 6, name: 'Technology', icon: '💻', quizzes: 53, modifier: 'indigo' }
  ];

  const stats = [
    { label: 'Total Quizzes', value: '1,200+', icon: Trophy },
    { label: 'Active Players', value: '50K+', icon: Users },
    { label: 'Minutes Played', value: '2M+', icon: Clock }
  ];

  const featuredQuizzes = [
    { id: 1, title: 'Ultimate Science Challenge', difficulty: 'hard', players: 1250, rating: 4.8 },
    { id: 2, title: 'Movie Trivia Masters', difficulty: 'medium', players: 980, rating: 4.6 },
    { id: 3, title: 'World Geography Quiz', difficulty: 'easy', players: 2100, rating: 4.9 }
  ];

  const getDifficultyText = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <h1 className="home__hero-title">
              QuizMaster
            </h1>
            <p className="home__hero-subtitle">
              Challenge your mind with thousands of exciting quizzes across every topic imaginable
            </p>
            <div className="home__hero-actions">
              <button className="home__cta-button">
                <Play size={24} />
                Start Playing Now
              </button>
              <button className="home__secondary-button">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home__stats">
        <div className="container">
          <div className="grid grid--3">
            {stats.map((stat, index) => (
              <div key={index} className="home__stat-card">
                <stat.icon className="home__stat-icon" size={48} />
                <div className="home__stat-value">{stat.value}</div>
                <div className="home__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home__categories">
        <div className="container">
          <h2 className="home__section-title">
            Explore Quiz Categories
          </h2>
          <p className="home__section-subtitle">
            From science to sports, discover quizzes that match your interests and expertise level
          </p>
          <div className="grid grid--6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="home__category-card"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`home__category-icon home__category-icon--${category.modifier} ${
                  hoveredCategory === category.id ? 'home__category-icon--hovered' : ''
                }`}>
                  {category.icon}
                </div>
                <h3 className="home__category-name">{category.name}</h3>
                <p className="home__category-count">{category.quizzes} quizzes available</p>
                <div className="home__category-arrow">
                  Explore <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="home__featured">
        <div className="container">
          <h2 className="home__section-title">
            Featured Quizzes
          </h2>
          <p className="home__section-subtitle">
            Try our most popular and highly-rated quizzes
          </p>
          <div className="grid grid--3">
            {featuredQuizzes.map((quiz) => (
              <div key={quiz.id} className="home__quiz-card">
                <div className="home__quiz-header">
                  <h3 className="home__quiz-title">{quiz.title}</h3>
                  <span className={`home__quiz-difficulty home__quiz-difficulty--${quiz.difficulty}`}>
                    {getDifficultyText(quiz.difficulty)}
                  </span>
                </div>
                <div className="home__quiz-stats">
                  <div className="home__quiz-stat">
                    <Users size={16} />
                    <span>{quiz.players.toLocaleString()} players</span>
                  </div>
                  <div className="home__quiz-stat">
                    <Star size={16} />
                    <span>{quiz.rating}</span>
                  </div>
                </div>
                <button className="home__quiz-play-btn">
                  <Play size={18} />
                  Play Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home__cta">
        <div className="container container--small">
          <h2 className="home__cta-title">
            Ready to Test Your Knowledge?
          </h2>
          <p className="home__cta-subtitle">
            Join thousands of players and start your quiz journey today!
          </p>
          <button className="home__cta-button">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;