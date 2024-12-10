import { Component } from 'react';
import PropTypes from 'prop-types';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { videoErrorHandler } from '../../../utils/video';

class VideoErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      isRecoverable: false
    };
  }

  static getDerivedStateFromError(error) {
    const isRecoverable = videoErrorHandler.isRecoverableError(error);
    return { 
      hasError: true, 
      error: videoErrorHandler.getErrorMessage(error),
      isRecoverable
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Video Error:', error, errorInfo);
    // You could send this to your error reporting service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
              <FiAlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            {/* Error Message */}
            <h3 className="text-xl font-semibold mb-2">
              Video Playback Error
            </h3>
            <p className="text-gray-400 mb-6">
              {this.state.error}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              {this.state.isRecoverable && (
                <button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 
                    rounded-lg transition-colors"
                >
                  <FiRefreshCw className="w-5 h-5" />
                  Try Again
                </button>
              )}
              {this.props.fallbackAction && (
                <button
                  onClick={this.props.fallbackAction}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {this.props.fallbackActionText || 'Go Back'}
                </button>
              )}
            </div>

            {/* Technical Details (if available) */}
            {this.props.showTechnicalDetails && this.state.error && (
              <div className="mt-8 p-4 bg-white/5 rounded-lg text-left">
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Technical Details
                </h4>
                <pre className="text-xs text-gray-500 overflow-x-auto">
                  {JSON.stringify(this.state.error, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

VideoErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onRetry: PropTypes.func,
  fallbackAction: PropTypes.func,
  fallbackActionText: PropTypes.string,
  showTechnicalDetails: PropTypes.bool
};

VideoErrorBoundary.defaultProps = {
  showTechnicalDetails: false
};

export default VideoErrorBoundary; 