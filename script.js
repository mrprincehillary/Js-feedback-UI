import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const FeedbackWidget = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SuccessMessage>
        <Checkmark />
        <h3>Thank you for your feedback!</h3>
        <p>We appreciate you taking the time to share your experience with us.</p>
      </SuccessMessage>
    );
  }

  return (
    <FeedbackContainer>
      <FeedbackForm onSubmit={handleSubmit}>
        <Title>How would you rate your experience?</Title>
        
        <RatingContainer>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <StarButton
                key={ratingValue}
                type="button"
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                <StarIcon 
                  active={ratingValue <= (hover || rating)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </StarIcon>
              </StarButton>
            );
          })}
        </RatingContainer>
        
        <TextArea
          placeholder="Any additional comments? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SubmitButton 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </SubmitButton>
      </FeedbackForm>
    </FeedbackContainer>
  );
};

export default FeedbackWidget;

// Styled Components
const FeedbackContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const StarIcon = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  fill: ${props => props.active ? '#FFD700' : '#E0E0E0'};
  transition: fill 0.2s;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  &::placeholder {
    color: #9e9e9e;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover {
    background-color: #3a7bc8;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin: -0.5rem 0 0;
  font-size: 0.9rem;
  text-align: center;
`;

const checkmarkAnimation = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const Checkmark = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #4CAF50;
  stroke-miterlimit: 10;
  margin: 0 auto 1.5rem;
  box-shadow: inset 0px 0px 0px #4CAF50;
  animation: ${checkmarkAnimation} 0.6s ease-in-out forwards;
  
  &:before {
    content: '';
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 3;
    stroke: #4CAF50;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4CAF50;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 28px;
    height: 14px;
    border-left: 3px solid #4CAF50;
    border-bottom: 3px solid #4CAF50;
    transform: rotate(-45deg) translate(16px, -20px);
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  
  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin: 0;
  }
`;